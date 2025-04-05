// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/utils/emailService.ts
import axios from "axios";
var RECIPIENT_EMAIL = process.env.RECIPIENT_EMAIL || "kumarrajeshconsultancy@gmail.com";
async function sendContactEmail(contactData) {
  try {
    const formData = new URLSearchParams();
    formData.append("name", contactData.name);
    formData.append("email", contactData.email);
    formData.append("phone", contactData.phone || "Not provided");
    formData.append("service", contactData.service || "Not specified");
    formData.append("message", contactData.message || "No message provided");
    formData.append("consent", contactData.consent ? "Yes" : "No");
    formData.append("_subject", "New Contact Form Submission - Kumar Rajesh Consultancy");
    formData.append("_template", "table");
    const response = await axios.post(
      `https://formsubmit.co/${RECIPIENT_EMAIL}`,
      formData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }
    );
    if (response.status >= 200 && response.status < 300) {
      console.log("Email sent via FormSubmit");
      return true;
    } else {
      console.error("FormSubmit returned error status:", response.status);
      return false;
    }
  } catch (error) {
    console.error("Error sending email via FormSubmit:", error);
    return false;
  }
}

// server/utils/whatsappService.ts
var RECIPIENT_PHONE_NUMBER = process.env.RECIPIENT_PHONE_NUMBER || "918810841429";
async function sendWhatsAppMessage(contactData) {
  try {
    console.log("WhatsApp notification handled via FormSubmit in frontend");
    return true;
  } catch (error) {
    console.error("Error with WhatsApp processing:", error);
    return false;
  }
}

// server/utils/googleSheetsService.ts
import { GoogleAuth } from "google-auth-library";
import { google } from "googleapis";
var GOOGLE_SHEETS_ID = process.env.GOOGLE_SHEETS_ID || "";
var GOOGLE_SHEETS_RANGE = process.env.GOOGLE_SHEETS_RANGE || "Sheet1!A:G";
var GOOGLE_SERVICE_ACCOUNT = process.env.GOOGLE_SERVICE_ACCOUNT || "";
async function addContactToSheet(contactData) {
  if (!GOOGLE_SHEETS_ID || !GOOGLE_SERVICE_ACCOUNT) {
    console.log("Google Sheets not configured. Skipping Google Sheets update.");
    return false;
  }
  try {
    const credentials = JSON.parse(GOOGLE_SERVICE_ACCOUNT);
    const auth = new GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"]
    });
    const sheets = google.sheets({ version: "v4", auth: await auth.getClient() });
    const currentTime = (/* @__PURE__ */ new Date()).toISOString();
    const values = [
      [
        contactData.name,
        contactData.email,
        contactData.phone || "",
        contactData.service || "",
        contactData.message || "",
        contactData.consent ? "Yes" : "No",
        currentTime
      ]
    ];
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: GOOGLE_SHEETS_ID,
      range: GOOGLE_SHEETS_RANGE,
      valueInputOption: "RAW",
      requestBody: {
        values
      }
    });
    console.log("Google Sheets update response:", response.data);
    return true;
  } catch (error) {
    console.error("Error adding to Google Sheets:", error);
    return false;
  }
}

// shared/schema.ts
import { pgTable, text, serial, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull()
});
var insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true
});
var contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  service: text("service"),
  message: text("message"),
  consent: boolean("consent").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var insertContactSchema = createInsertSchema(contactSubmissions).pick({
  name: true,
  email: true,
  phone: true,
  service: true,
  message: true,
  consent: true
});

// server/routes.ts
async function registerRoutes(app2) {
  app2.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const [emailResult, whatsappResult, sheetsResult] = await Promise.allSettled([
        // Send email notification
        sendContactEmail(validatedData),
        // Send WhatsApp notification
        sendWhatsAppMessage(validatedData),
        // Store in Google Sheets
        addContactToSheet(validatedData)
      ]);
      console.log({
        email: emailResult.status === "fulfilled" ? "Sent" : emailResult.reason,
        whatsapp: whatsappResult.status === "fulfilled" ? "Sent" : whatsappResult.reason,
        sheets: sheetsResult.status === "fulfilled" ? "Added" : sheetsResult.reason
      });
      if (emailResult.status === "fulfilled" || whatsappResult.status === "fulfilled" || sheetsResult.status === "fulfilled") {
        res.status(200).json({
          success: true,
          message: "Form submitted successfully"
        });
      } else {
        throw new Error("Failed to process form submission through any method");
      }
    } catch (error) {
      console.error("Contact form error:", error);
      if (error instanceof Error) {
        res.status(400).json({
          success: false,
          message: error.message || "Failed to process form submission"
        });
      } else {
        res.status(500).json({
          success: false,
          message: "An unexpected error occurred"
        });
      }
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import themePlugin from "@replit/vite-plugin-shadcn-theme-json";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    themePlugin(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = 5e3;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
