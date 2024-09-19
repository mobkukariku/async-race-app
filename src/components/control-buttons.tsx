import { FC } from "react";
import { SquarePen } from "lucide-react";
import { Button } from "./";

interface ControlButtonsProps {
  onOpenModal: () => void;
  onReset: () => void;
  onMove: () => void;
  onDelete: () => void;
}

export const ControlButtons: FC<ControlButtonsProps> = ({ onOpenModal, onReset, onMove, onDelete }) => (
  <div className="flex  gap-2">
    <div className="flex flex-col gap-2">
      <Button icon={<SquarePen />} title="Edit" onClick={onOpenModal} />
      <Button title="Delete" onClick={onDelete} />
    </div>
    <div className="flex flex-col gap-2">
      <Button title="A" onClick={onMove} />
      <Button title="B" onClick={onReset} />
    </div>
  </div>
);
