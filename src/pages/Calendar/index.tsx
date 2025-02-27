import { useState } from "react";
import {
  FaCalendarAlt,
  FaChevronLeft,
  FaChevronRight,
  FaPlus,
} from "react-icons/fa";
import styles from "./Calendar.module.css";

interface StudyEvent {
  id: string;
  title: string;
  subject: string;
  date: string;
  startTime: string;
  endTime: string;
  description?: string;
}

const mockEvents: StudyEvent[] = [
  {
    id: "1",
    title: "Revisão de Matemática",
    subject: "Matemática",
    date: "2025-02-23",
    startTime: "14:00",
    endTime: "16:00",
    description: "Revisão de funções quadráticas e exponenciais",
  },
];

const daysOfWeek = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

export function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events] = useState<StudyEvent[]>(mockEvents);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];

    for (let i = 0; i < firstDay.getDay(); i++) {
      days.unshift({ date: new Date(year, month, -i), isCurrentMonth: false });
    }

    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push({ date: new Date(year, month, i), isCurrentMonth: true });
    }

    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({ date: new Date(year, month + 1, i), isCurrentMonth: false });
    }

    return days;
  };

  const getEventsForDate = (date: Date) => {
    return events.filter(
      (event) => event.date === date.toISOString().split("T")[0]
    );
  };

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate(
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + (direction === "next" ? 1 : -1),
        1
      )
    );
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Calendário de Estudos</h1>
        <p>Organize seus horários e mantenha uma rotina consistente</p>
      </header>

      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div className={styles.cardTitle}>
            <FaCalendarAlt className={styles.icon} />
            <h2>
              {currentDate.toLocaleDateString("pt-BR", {
                month: "long",
                year: "numeric",
              })}
            </h2>
          </div>
          <div className={styles.actions}>
            <button onClick={() => navigateMonth("prev")}>
              <FaChevronLeft /> Anterior
            </button>
            <button onClick={() => navigateMonth("next")}>
              Próximo <FaChevronRight />
            </button>
            <button
              className={styles.addButton}
              onClick={() => handleDateClick(new Date())}
            >
              <FaPlus /> Novo Evento
            </button>
          </div>
        </div>

        <div className={styles.calendarGrid}>
          {daysOfWeek.map((day) => (
            <div
              key={day}
              className={styles.weekDay}
            >
              {day}
            </div>
          ))}

          {getDaysInMonth(currentDate).map(
            ({ date, isCurrentMonth }, index) => {
              const dayEvents = getEventsForDate(date);
              const isToday = date.toDateString() === new Date().toDateString();

              return (
                <div
                  key={index}
                  className={`${styles.day} ${
                    isCurrentMonth ? styles.currentMonth : styles.otherMonth
                  }`}
                  onClick={() => handleDateClick(date)}
                >
                  <span className={isToday ? styles.today : ""}>
                    {date.getDate()}
                  </span>
                  {dayEvents.length > 0 && (
                    <span className={styles.badge}>{dayEvents.length}</span>
                  )}
                </div>
              );
            }
          )}
        </div>
      </div>

      {isModalOpen && selectedDate && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>Novo Evento de Estudo</h2>
            <button
              className={styles.closeButton}
              onClick={() => setIsModalOpen(false)}
            >
              ✖
            </button>
            <div className={styles.formGroup}>
              <label>Título</label>
              <input
                type="text"
                placeholder="Ex: Revisão de Matemática"
              />
            </div>
            <div className={styles.formGroup}>
              <label>Matéria</label>
              <select>
                <option value="matematica">Matemática</option>
                <option value="portugues">Português</option>
                <option value="historia">História</option>
                <option value="geografia">Geografia</option>
                <option value="fisica">Física</option>
                <option value="quimica">Química</option>
              </select>
            </div>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>Data</label>
                <input
                  type="date"
                  defaultValue={selectedDate.toISOString().split("T")[0]}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Horário</label>
                <input type="time" />
              </div>
            </div>
            <div className={styles.formGroup}>
              <label>Descrição</label>
              <textarea
                rows={4}
                placeholder="Descreva os tópicos que serão estudados"
              ></textarea>
            </div>
            <div className={styles.modalActions}>
              <button onClick={() => setIsModalOpen(false)}>Cancelar</button>
              <button className={styles.saveButton}>Salvar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
