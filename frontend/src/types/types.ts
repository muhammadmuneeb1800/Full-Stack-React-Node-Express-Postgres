export interface todosProps {
  id?: number;
  title: string;
  description: string;
}

export interface buttonProps {
  title: string;
  onClick?: () => void;
  type: "button" | "submit";
}

export interface inputProps {
  title: string;
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
