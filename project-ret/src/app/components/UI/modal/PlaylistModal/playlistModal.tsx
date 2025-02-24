'use client'

import { useState } from "react";
import { Modal } from "../modal"

export default function CreatePlaylistModal() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handlerClick = () => setIsOpen(!isOpen);

  return (
    <>
      <button
        onClick={handlerClick}
        className="px-4 py-2 bg-gradient-to-r bg-orange-500 text-white rounded-full"
      >
        create playlist
      </button>

      <Modal isOpen={isOpen} title="Create new playlist">
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Playlist Name</label>
            <input
              type="text"
              name="username"
          
              
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
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
              className="px-4 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-all duration-200"
            >
              Create playlist
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}