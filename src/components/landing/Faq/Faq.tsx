"use client";

import { useState } from "react";
import styles from "./Faq.module.css";
import { FaqItem } from "@/types";

interface FAQProps {
  items: FaqItem[];
}

export default function FAQ({ items }: FAQProps) {
  const [abierto, setAbierto] = useState<string | null>(null);

  if (items.length === 0) return null;

  return (
    <section id="faq" className={styles.section}>
      <div className={styles.container}>
        <p className={styles.eyebrow}>Soporte</p>
        <h2 className={styles.title}>Preguntas frecuentes</h2>

        <div className={styles.list}>
          {items.map((item) => (
            <div key={item.id} className={styles.item}>
              <button
                className={styles.question}
                onClick={() => setAbierto(abierto === item.id ? null : item.id)}
                aria-expanded={abierto === item.id}
              >
                <span>{item.pregunta}</span>
                <span
                  className={`${styles.icon} ${abierto === item.id ? styles.iconOpen : ""}`}
                >
                  +
                </span>
              </button>

              {abierto === item.id && (
                <div className={styles.answer}>
                  <p>{item.respuesta}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
