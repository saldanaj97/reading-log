"use client";

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import Image from "next/image";
import { useState } from "react";
import type { Book } from "~/types/books";

export default function BookModal({ books }: { books: Book[] }) {
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);

  const openModal = (bookId: string | null) => setSelectedBookId(bookId);
  const closeModal = () => setSelectedBookId(null);

  return (
    <div className="m-1 flex h-full cursor-pointer items-center justify-center p-2">
      {books.map((book) => (
        <div key={book.id}>
          <Button
            onPress={() => openModal(book.id)}
            className="m-1 h-full w-full bg-transparent p-2"
          >
            <div className="relative h-[160px] w-[115px]">
              {book.thumbnail ? (
                <Image
                  src={book.thumbnail}
                  alt={book.title}
                  fill={true}
                  className={"object-cover"}
                  sizes={"max-width: 115px, max-height: 160px"}
                />
              ) : (
                <p>{book.title}</p>
              )}
            </div>
          </Button>

          <Modal
            isOpen={selectedBookId === book.id}
            onClose={closeModal}
            placement="center"
            backdrop="opaque"
            size="lg"
          >
            <ModalContent>
              <ModalHeader>
                <div className="flex flex-col">
                  <p className="text-2xl">{book.title}</p>
                  <p className="text-base">{book.author}</p>
                </div>
              </ModalHeader>
              <ModalBody>
                {book.description ? (
                  <div>{book.description}</div>
                ) : (
                  <div>No description available for this title. </div>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={closeModal}>
                  Close
                </Button>
                <Button color="primary" onPress={closeModal}>
                  Edit
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </div>
      ))}
    </div>
  );
}
