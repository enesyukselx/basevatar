export interface IFaq {
    id: string;
    content: string;
    title: string;
    order: number;
}

export interface IVote {
    id: string;
    value: string[];
    count: number;
}

export type TFormState = {
    message: string;
    errors: Record<string, string[]>;
};
