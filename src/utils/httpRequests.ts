import { toast } from "react-hot-toast";

export function getRequest(url: string) {
  return fetch(url).then((res) => {
    if (!res.ok) {
      throw new Error(`${res.status}: ${res.statusText}`);
    }

    return res.json();
  });
}

export function postRequest(url: string, body: string) {
  return fetch(url, {
    method: "POST",
    body,
  }).then((res) => {
    if (res.ok) {
      toast.success("Entität erfolgreich erstellt!");
      return res.json();
    }

    toast.error("Fehler beim erstellen der Entität!");
  });
}

export function deleteRequest(url: string) {
  return fetch(url, { method: "DELETE" }).then((res) => {
    if (res.ok) {
      toast.success("Entität erfolgreich gelöscht!");
      return res.json();
    }

    toast.error("Fehler beim löschen der Entität!");
  });
}
