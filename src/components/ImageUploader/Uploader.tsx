import React, { useEffect, useState } from "react";

import { FaCloudUploadAlt, FaImage } from "react-icons/fa";
import { MdCloudUpload } from "react-icons/md";
import { Progress } from "flowbite-react";

import PreviewImagens from "./PreviewImagens";
import { Button } from "@src/components/comum/button";
import { Input } from "@src/components/comum/input";
import { TabItem, Tabs } from "flowbite-react";
import { HiAdjustments, HiClipboardList, HiUserCircle } from "react-icons/hi";
import { ImagemPreview } from "@src/components/tipos";
import LoadingSpiner from "../loader/LoadingSpiner";
import Alerta from "../comum/alertas";

interface UploaderProps {
  imagens: ImagemPreview[];
  setImagens: React.Dispatch<React.SetStateAction<ImagemPreview[]>>;

  imageToUpload: File[];
  setImageToUpload: React.Dispatch<React.SetStateAction<File[]>>;
  loading: boolean;
  setRelistar?: React.Dispatch<React.SetStateAction<boolean>>;
  progress?: number | null;
}

function Uploader({
  imagens,
  setImagens,
  imageToUpload,
  setImageToUpload,
  loading,
  setRelistar,
  progress,
}: UploaderProps) {
  const [temImagens, setTemImagens] = useState<boolean>(imagens?.length! > 0);
  const [numeroMaximoImagens] = useState<number>(15);

  // progress
  const [texto, setTexto] = useState<string>("fazendo upload...");

  const tiposPermitidos = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
  ];

  useEffect(() => {
    setTemImagens(imagens.length > 0);
  }, [imagens]);

  useEffect(() => {
    if (progress === 100) {
      setTexto("Convertendo imagens...");
    }
  }, [progress]);

  return (
    <LoadingSpiner loading={loading || false}>
      <div className=" border border-[var(--base-color)] rounded-lg">
        <Tabs aria-label="Tabs with icons" variant="underline">
          {/* Imagens vindas do banco */}
          <TabItem
            title="Galeria"
            icon={FaImage}
            disabled={!temImagens}
            active={temImagens}
          >
            <div className="flex flex-col gap-3 items-center justify-center ">
              <PreviewImagens
                imagens={imagens || []}
                setImagens={setImagens || []}
                endpoint={`chamados`}
                setRelistar={setRelistar}
              />
            </div>
          </TabItem>
          {/* Upload de imagens */}
          <TabItem title="Upload" icon={MdCloudUpload} active={!temImagens}>
            <div className="flex flex-col gap-3  items-center">
              <div className="w-full">
                {progress !== null && progress && (
                  <div className="mb-4">
                    <Progress
                      progress={progress || 0}
                      textLabel={texto}
                      color="green"
                      size="lg"
                      labelProgress
                      labelText
                    />
                  </div>
                )}

                {/* Input escondido */}
                <Input
                  id="imageUpload"
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    if (!e.target.files) return;
                    if (e.target.files.length > numeroMaximoImagens) {
                      alert("Selecione no máximo 15 imagens");
                      return;
                    }

                    for (let i = 0; i < e.target.files.length; i++) {
                      if (!tiposPermitidos.includes(e.target.files[i].type)) {
                        alert("Selecione apenas imagens");
                        return;
                      }
                    }

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
                imagens={imageToUpload || []}
                setImagens={setImageToUpload || []}
              />
            </div>
          </TabItem>
        </Tabs>
      </div>
    </LoadingSpiner>
  );
}

export default Uploader;
