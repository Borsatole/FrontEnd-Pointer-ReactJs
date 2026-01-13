import React from "react";

import { FaCloudUploadAlt, FaImage } from "react-icons/fa";
import { MdCloudUpload } from "react-icons/md";

import PreviewImagens from "./PreviewImagens";
import { Button } from "@src/components/comum/button";
import { Input } from "@src/components/comum/input";
import { TabItem, Tabs } from "flowbite-react";
import { HiAdjustments, HiClipboardList, HiUserCircle } from "react-icons/hi";

import LoadingSpiner from "../loader/LoadingSpiner";

interface UploaderProps {
  imagens: File[];
  setImagens: React.Dispatch<React.SetStateAction<File[]>>;
  imageToUpload: File[];
  setImageToUpload: React.Dispatch<React.SetStateAction<File[]>>;
  loading: boolean;
}

function Uploader({
  imagens,
  setImagens,
  imageToUpload,
  setImageToUpload,
  loading,
}: UploaderProps) {
  return (
    <LoadingSpiner loading={loading}>
      <div className=" border border-[var(--base-color)] rounded-lg">
        <Tabs aria-label="Tabs with icons" variant="underline">
          {/* Imagens vindas do banco */}
          <TabItem active title="Galeria" icon={FaImage}>
            <div className="flex flex-col gap-3 items-center justify-center h-[250px]">
              <PreviewImagens imagens={imageToUpload} setImagens={setImagens} />
            </div>
          </TabItem>
          {/* Upload de imagens */}
          <TabItem title="Upload" icon={MdCloudUpload}>
            <div className="flex flex-col gap-3  items-center  h-[250px]">
              <div className="w-full">
                {/* Input escondido */}
                <Input
                  id="imageUpload"
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    if (!e.target.files) return;

                    const novasImagens = Array.from(e.target.files);
                    setImageToUpload((prev) => [...prev, ...novasImagens]);

                    e.target.value = "";
                  }}
                />

                {/* Área de upload */}
                <div
                  onClick={() =>
                    document.getElementById("imageUpload")?.click()
                  }
                  className="
                    cursor-pointer
                    border-2 border-dashed border-[var(--corPrincipal)]
                    rounded-lg
                    p-4
                    flex  items-center justify-center
                    gap-3
                    transition
                    "
                >
                  <FaCloudUploadAlt className="text-5xl" />

                  <p className="text-sm font-medium">
                    Arraste imagens ou clique para enviar
                  </p>
                </div>
              </div>
              <PreviewImagens
                imagens={imageToUpload}
                setImagens={setImageToUpload}
              />
            </div>
          </TabItem>
        </Tabs>
      </div>
    </LoadingSpiner>
  );
}

export default Uploader;
