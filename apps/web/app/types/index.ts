export interface IFaq {
    title: string;
    content: string;
}

export interface IVote {
    id: string;
    value: string[];
    count: number;
    type?: "color" | "theme";
}

export type TFormState = {
    message: string;
    errors: Record<string, string[]>;
};
