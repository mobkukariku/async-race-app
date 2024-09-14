import { FC } from "react";
import { SquarePen } from "lucide-react";
import { Button } from "./";

interface ControlButtonsProps {
  car: any;
  onOpenModal: () => void;
  onReset: () => void;
  onMove: () => void;
}

export const ControlButtons: FC<ControlButtonsProps> = ({ car, onOpenModal, onReset, onMove }) => (
  <div className="flex gap-2">
    <Button icon={<SquarePen />} title="Edit" onClick={onOpenModal} />
    <Button title="A" onClick={onMove} />
    <Button title="B" onClick={onReset} />
  </div>
);
