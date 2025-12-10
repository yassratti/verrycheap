export type UserData = {
  email: string | undefined;
  avatar_url: string | undefined;
  full_name: string | undefined;
};


export interface ImageUploadProps {
  value?: string;
  onChange?: (file: File | null) => void;
  className?: string;
  defaultPreview?: string;
}

export interface AddProductProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: React.ReactNode;
}