import React from "react";

function groupPage({ params }: { params: { id: string } }): React.ReactElement {

    return (
        <div>
            <h1>Group Page with ID: {params.id}</h1>
        </div>
    );
}

export default groupPage;