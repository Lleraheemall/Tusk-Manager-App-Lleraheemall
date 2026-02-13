import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useCreateTusk = (onAdd) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [error, setError] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "title" && value.trim()) {
      setError(false);
    }
  };

  const submitHandle = (event) => {
    event.preventDefault();

    if (!formData.title.trim()) {
      setError(true);
      return;
    }

    const newTusk = {
      id: Date.now().toString(),
      title: formData.title.trim(),
      description: formData.description.trim(),
      completed: false,
      createdAt: Date.now(),
    };

    onAdd(newTusk);
    navigate("/");
  };

  const handleCancel = () => navigate("/");

  return {
    formData,
    error,
    handleChange,
    submitHandle,
    handleCancel,
  };
};
