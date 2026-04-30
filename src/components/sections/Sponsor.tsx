"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";

const amounts = [51, 201, 501, 1000];
const UPI_ID = "sujalop821@oksbi";
const PAYEE_NAME = "Sujal Kumar";

export default function Sponsor() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);

  const getUpiUrl = (amount: number) => {
    return `upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(
      PAYEE_NAME
    )}&cu=INR&am=${amount}`;
  };

  return (
    <section
      id="sponsor"
      className="section-alt"
      style={{
        padding: "100px 24px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div style={{ maxWidth: 600, width: "100%", textAlign: "center" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2
            style={{
              fontSize: "clamp(2rem, 5vw, 3rem)",
              marginBottom: 16,
              color: "var(--fg)",
            }}
          >
            Sponsor My <span className="gradient-text underline-sketch">Work</span>
          </h2>
          <p
            style={{
              color: "var(--muted)",
              marginBottom: 40,
              fontSize: "1rem",
              lineHeight: 1.6,
            }}
          >
            If you find my work helpful and want to support my open-source
            contributions and projects, consider buying me a coffee (or a
            pizza!).
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 12,
            flexWrap: "wrap",
            marginBottom: 40,
          }}
        >
          {amounts.map((amount) => (
            <button
              key={amount}
              onClick={() => setSelectedAmount(amount)}
              style={{
                padding: "12px 24px",
                borderRadius: 8,
                border:
                  selectedAmount === amount
                    ? "2px solid var(--blue)"
                    : "1px solid var(--border)",
                background:
                  selectedAmount === amount
                    ? "var(--blue-glow)"
                    : "var(--surface)",
                color: selectedAmount === amount ? "var(--blue)" : "var(--fg)",
                fontWeight: selectedAmount === amount ? 600 : 400,
                cursor: "pointer",
                transition: "all 0.2s ease",
                fontSize: "1.1rem",
              }}
            >
              ₹{amount}
            </button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          {selectedAmount && (
            <motion.div
              key={selectedAmount}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              style={{
                background: "#fff",
                padding: 32,
                borderRadius: 16,
                display: "inline-block",
                boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
              }}
            >
              <QRCodeSVG
                value={getUpiUrl(selectedAmount)}
                size={200}
                bgColor={"#ffffff"}
                fgColor={"#000000"}
                level={"M"}
                includeMargin={false}
              />
              <p
                style={{
                  marginTop: 20,
                  color: "#000",
                  fontWeight: 600,
                  fontSize: "1.2rem",
                }}
              >
                Scan to pay ₹{selectedAmount}
              </p>
              <a
                href={getUpiUrl(selectedAmount)}
                style={{
                  display: "block",
                  marginTop: 16,
                  padding: "10px 20px",
                  background: "var(--blue)",
                  color: "#fff",
                  borderRadius: 6,
                  textDecoration: "none",
                  fontWeight: 500,
                  fontSize: "0.9rem",
                }}
                className="md:hidden"
              >
                Open UPI App
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
