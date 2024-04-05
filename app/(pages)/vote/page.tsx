const Page = () => {
    return (
        <section className="section-vote">
            <div className="container">
                <div className="heading">
                    <h1 className="title">Vote for Day #2 Themes</h1>
                    <p className="subtitle">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa recu.</p>
                </div>
                <div className="row gx-8">
                    <div className="sm:col-6 lg:col-4">
                        <div className="vote-card color-palette">
                            <div className="colors">
                                <div className="color" style={{ backgroundColor: "#FFD700" }}></div>
                                <div className="color" style={{ backgroundColor: "#FFA500" }}></div>
                                <div className="color" style={{ backgroundColor: "#FF6347" }}></div>
                                <div className="color" style={{ backgroundColor: "#FF4500" }}></div>
                                <div className="color" style={{ backgroundColor: "#FF0000" }}></div>
                            </div>
                            <div className="color-vote">
                                <button className="vote-btn">Vote</button>
                            </div>
                        </div>
                        <div className="vote-card color-palette">
                            <div className="colors">
                                <div className="color" style={{ backgroundColor: "#FFD700" }}></div>
                                <div className="color" style={{ backgroundColor: "#FFA500" }}></div>
                                <div className="color" style={{ backgroundColor: "#FF6347" }}></div>
                                <div className="color" style={{ backgroundColor: "#FF4500" }}></div>
                                <div className="color" style={{ backgroundColor: "#FF0000" }}></div>
                            </div>
                            <div className="color-vote">
                                <button className="vote-btn">Vote</button>
                            </div>
                        </div>
                        <div className="vote-card color-palette">
                            <div className="colors">
                                <div className="color" style={{ backgroundColor: "#FFD700" }}></div>
                                <div className="color" style={{ backgroundColor: "#FFA500" }}></div>
                                <div className="color" style={{ backgroundColor: "#FF6347" }}></div>
                                <div className="color" style={{ backgroundColor: "#FF4500" }}></div>
                                <div className="color" style={{ backgroundColor: "#FF0000" }}></div>
                            </div>
                            <div className="color-vote">
                                <button className="vote-btn">Vote</button>
                            </div>
                        </div>
                    </div>
                    <div className="sm:col-6 lg:col-4">
                        <div className="vote-card subject">
                            <div className="title">Subject #1</div>
                            <div className="subject-vote">
                                <button className="vote-btn">Vote</button>
                            </div>
                        </div>
                        <div className="vote-card subject">
                            <div className="title">Subject #2</div>
                            <div className="subject-vote">
                                <button className="vote-btn">Vote</button>
                            </div>
                        </div>
                        <div className="vote-card subject">
                            <div className="title">Subject #3</div>
                            <div className="subject-vote">
                                <button className="vote-btn">Vote</button>
                            </div>
                        </div>
                        <div className="vote-card subject">
                            <div className="title">Subject #4</div>
                            <div className="subject-vote">
                                <button className="vote-btn">Vote</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Page;
