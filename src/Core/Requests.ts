export class RequestsClass {
    public post<RESPONSE, REQUEST = any>(url: string, data: REQUEST): Promise<RESPONSE> {
        const body = new FormData();
        body.append(
            "json",
            JSON.stringify(data),
        );

        return new Promise<RESPONSE>((resolve, reject) => {
            fetch(url, {body, method: "POST"})
                .then((res: Response) => {
                    const response = res.json<>() as RESPONSE;
                    resolve(response);
                })
                .catch((e: Error) => reject(e));
        });
    }
}

export const Requests = new RequestsClass();
