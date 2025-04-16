import { IFaq } from "@/app/types";
import Faq from "../../../components/Faq/Faq";

const Page = async () => {
    const items: IFaq[] = [
        {
          title: "What is the main theme of the project?",
          content: "The project is a Web3 initiative where the daily combined drawings of 100 different users create a single image by the end of the day, which can then be minted as an NFT on the website for 24 hours."
        },
        {
          title: "Which infrastructure does the project use?",
          content: "The project operates on the BASE network infrastructure."
        },
        {
          title: "What is required to make a drawing?",
          content: "To draw, users need to connect their wallets such as MetaMask, Coinbase Wallet, etc."
        },
        {
          title: "How is the revenue from the minted image distributed?",
          content: "50% of the revenue from the minted image is shared among the artists."
        },
        {
          title: "How many drawings can a wallet owner submit per day?",
          content: "Each wallet owner can submit only one drawing per day."
        },
        {
          title: "How are the theme and color palettes for the next day determined?",
          content: "The theme and color palettes for the next day are determined by voting, which costs 0.0001 ETH per vote."
        },
        {
          title: "How many votes can one person cast?",
          content: "A person can cast as many votes as they want."
        },
        {
          title: "What happens to the submitted drawings?",
          content: "Submitted drawings are reviewed and approved before being included in the daily image."
        }
      ];
      

    return (
        <section className="py-8">
            <div className="container">
                <div className="row">
                    <div className="heading">
                        <h1 className="title">FAQ</h1>
                        <p className="subtitle">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, exercitationem deserunt
                            nemo ab praesentium.
                        </p>
                    </div>
                    <Faq data={items ?? {}} />
                </div>
            </div>
        </section>
    );
};

export default Page;
