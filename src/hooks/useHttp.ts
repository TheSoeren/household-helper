import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

enum Status {
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
}

export default function useHttp() {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<[Status, string] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!status) return;

    const [code, message] = status;

    switch (code) {
      case Status.SUCCESS:
        toast.success(message);
        break;
      case Status.ERROR:
        toast.error(message);
        break;
    }
  }, [status]);

  const getRequest = (url: string) => {
    setIsLoading(true);
    setStatus(null);
    setError(false);

    return fetch(url)
      .then((res) => {
        if (res.ok) return res.json();
        setStatus([Status.ERROR, `${res.status}: ${res.statusText}`]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const postRequest = (url: string, body: string) => {
    setIsLoading(true);
    setStatus(null);

    return fetch(url, {
      method: "POST",
      body,
    })
      .then((res) => {
        if (res.ok) {
          setStatus([Status.SUCCESS, "Entität erfolgreich erstellt!"]);
          return res.json();
        }
        setStatus([Status.ERROR, "Fehler beim erstellen der Entität!"]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const deleteRequest = (url: string) =>
    fetch(url, { method: "DELETE" })
      .then((res) => {
        if (res.ok) {
          setStatus([Status.SUCCESS, "Entität erfolgreich gelöscht!"]);
          return res.json();
        }
        setStatus([Status.ERROR, "Fehler beim löschen der Entität!"]);
      })
      .finally(() => {
        setIsLoading(false);
      });

  return {
    isLoading,
    error,
    getRequest,
    postRequest,
    deleteRequest,
  };
}
