import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export const useEditTusk = (tusks, setTusks) => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Знаходимо потрібний елемент
  const existingTusk = tusks.find((t) => t.id === id);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Синхронізуємо локальний стан із знайденим об'єктом
  useEffect(() => {
    if (existingTusk) {
      setTitle(existingTusk.title);
      setDescription(existingTusk.description || "");
    }
  }, [existingTusk]);

  const handleSave = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Title can't be null");
      return;
    }

    setTusks((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, title: title.trim(), description: description.trim() }
          : t,
      ),
    );

    navigate(`/tusk/${id}`);
  };

  const handleCancel = () => navigate(-1);

  return {
    title,
    setTitle,
    description,
    setDescription,
    handleSave,
    handleCancel,
    exists: !!existingTusk, // зручно для перевірки редіректу
  };
};
