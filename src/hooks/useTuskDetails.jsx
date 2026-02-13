import { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

export const useTuskDetails = (tusks, setTusks) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [openConfirm, setOpenConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const tusk = tusks.find((t) => t.id === id);

  const goBack = () => {
    if (location.state?.from) {
      navigate(location.state.from);
    } else {
      navigate("/");
    }
  };

  const handleDelete = () => {
    setIsDeleting(true);
    setTusks((prev) => prev.filter((item) => item.id !== id));
    setOpenConfirm(false);
    navigate("/");
  };

  return {
    tusk,
    id,
    openConfirm,
    setOpenConfirm,
    isDeleting,
    goBack,
    handleDelete,
  };
};
