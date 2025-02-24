'use client'

import { useState } from "react";
import { Modal } from "../modal"
import { userModel } from "@/app/api/models/models";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/lib/store";
import { fetchUsers } from "@/app/lib/features/userSlice";

export default function AddUserModal() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState<userModel>({
    username: "",
    email: "",
    password: "",
    roleAccess: {
      role: "User",
      access: 3
    },
    avatar: null as File | null,
  })
  const handlerClick = () => setIsOpen(!isOpen);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name.startsWith("roleAccess[")) {
      // Обработка вложенного свойства roleAccess
      const key = name.replace("roleAccess[", "").replace("]", ""); // Извлекаем ключ (например, "role")
      setFormData({
        ...formData,
        roleAccess: {
          ...formData.roleAccess,
          [key]: value, // Обновляем нужное свойство в roleAccess
        },
      });
    } else {
      // Обработка обычных свойств
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({
        ...formData,
        avatar: e.target.files[0], // Сохраняем выбранный файл
      });
    }
  };
  const handlerSend = async (e: React.FormEvent) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("username", formData.username);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("roleAccess[role]", formData.roleAccess.role);
    formDataToSend.append("roleAccess[access]", String(formData.roleAccess.access));
    if (formData.avatar) {
      formDataToSend.append("avatar", formData.avatar as Blob); // Добавляем файл
    }

    try {
      const response = await fetch("/api/users", {
        method: "POST",
        body: formDataToSend, // Отправляем FormData
      });
      dispatch(fetchUsers());
      if (!response.ok) {
        throw new Error("Ошибка при добавлении пользователя");
      }

      setIsOpen(false);
      setFormData({
        username: "",
        password: "",
        email: "",
        roleAccess: { role: "1", access: 1 },
        avatar: null,
      });
    } catch (error) {
      console.error("Ошибка:", error);
    }
  };


  return (
    <>
      <button
        onClick={handlerClick}
        className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg"
      >
        Add User
      </button>

      <Modal isOpen={isOpen} title="Add New User">
        <form onSubmit={handlerSend} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Role</label>
            <select
              name="roleAccess[role]"
              value={formData.roleAccess.role}

              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value={1}>Admin</option>
              <option value={2}>Author</option>
              <option value={3}>User</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Avatar</label>
            <input
              type="file"
              name="avatar"
              accept="image/png, image/jpeg"
              onChange={handleFileChange}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              className="px-4 py-2 bg-gray-700 text-white rounded-full hover:bg-gray-600 transition-all duration-200"
              onClick={handlerClick}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
            >
              Add User
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}