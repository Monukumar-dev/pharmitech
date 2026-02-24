"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCompany } from "@/store/action/companyActions";

export default function AppInitializer() {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.company);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCompany());
    }
  }, [status, dispatch]);

  return null; 
}