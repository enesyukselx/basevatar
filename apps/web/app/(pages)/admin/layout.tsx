import Link from "next/link";

import "./assets/admin-layout.scss";

export default async function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="admin">
            <div className="container">
                <div className="row">
                    <div className="col-3">
                        <div className="menu">
                            <ul>
                                <li>
                                    <Link href="/admin">Dashboard</Link>
                                </li>
                                <li>
                                    <Link href="/admin/votes">Votes</Link>
                                </li>
                                <li>
                                    <Link href="/admin/settings">Settings</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-9">{children}</div>
                </div>
            </div>
        </div>
    );
}
