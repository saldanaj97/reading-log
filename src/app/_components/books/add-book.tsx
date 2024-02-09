"use client";

import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";

import { useState } from "react";
import useBookApi from "~/app/hooks/useBookApi";

export default function AddBook() {
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    id: "",
    etag: "",
    thumbnail: "",
    selfLink: "",
  });
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { addBook, isLoading, isDenied } = useBookApi();

  if (isDenied) {
    alert("Failed to add book. Please try again.");
  }

  const handleInputChange = (e: {
    target: { name: string; value: string };
  }) => {
    const { name, value } = e.target;
    setNewBook((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="m-1 flex h-full cursor-pointer items-center justify-center p-2">
      <Button
        onPress={onOpen}
        disabled={isLoading}
        className="flex h-40 w-28 items-center justify-center bg-slate-500/50"
      >
        +
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement={"center"}
        backdrop={"opaque"}
        className="w-full bg-background"
        size="lg"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add a new book
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-row justify-center">
                  <Input
                    type="text"
                    name="title"
                    value={newBook.title}
                    onChange={handleInputChange}
                    className="m-1 w-60 p-2 text-black"
                    placeholder="Title"
                    variant="flat"
                  />
                  <Input
                    type="text"
                    name="author"
                    value={newBook.author}
                    onChange={handleInputChange}
                    className="m-1 w-60 p-2 text-black"
                    placeholder="Author"
                    variant="flat"
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={async () => {
                    await addBook({ book: newBook }).then(() => {
                      setNewBook({
                        title: "",
                        author: "",
                        id: "",
                        etag: "",
                        thumbnail: "",
                        selfLink: "",
                      });
                    });
                    onClose();
                  }}
                >
                  Add
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
