import axios from "axios";

// check for duplicate
export function hasDuplicates(arr: any) {
  return new Set(arr).size !== arr.length;
}

export const refreshToken = async (
  subdomain: any,
  refresh_token: string,
  client_id: string,
  client_secret: string
) => {
  try {
    const response = await axios.post(
      `https://${subdomain}.thinkific.com/oauth2/token`,
      {
        grant_type: "refresh_token",
        refresh_token: `${refresh_token}`,
      },
      {
        headers: {
          Authorization:
            "Basic " +
            Buffer.from(client_id + ":" + client_secret).toString("base64"),
        },
      }
    );
    return response.data;
  } catch (error: any) {
    if (error.response.data.error === "invalid refresh token") {
      console.log("error.data", error.response.data);
    }
  }
};
