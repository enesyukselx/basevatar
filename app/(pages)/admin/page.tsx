import fetchSettings from "@/app/actions/common/fetch-settings";

const Page = async () => {
    const { settings, error } = await fetchSettings();

    const getSettingValueByKey = (key: string) => {
        return settings.filter((setting) => {
            if (setting.key === key) return setting;
        })[0].value;
    };

    const day = getSettingValueByKey("day");
    const theme = getSettingValueByKey("theme");
    const colors = getSettingValueByKey("color").split(",");

    return (
        <section>
            <div className="heading">
                <h1 className="title">Dashboard</h1>
                <p className="subtitle">Welcome to the admin dashboard.</p>
                {error && <div className="error-message">Internal Server Error, Please try again later.</div>}
                <div className="flex gap-8">
                    <div className="py-4">
                        <div>Day</div>
                        <div>{day}</div>
                    </div>
                    <div className="py-4">
                        <div>Theme</div>
                        <div>{theme}</div>
                    </div>
                    <div className="py-4">
                        <div>Colors</div>
                        <div className="flex">
                            {colors.map((color, index) => (
                                <div key={index} style={{ background: color, width: 20, height: 20 }}></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Page;
