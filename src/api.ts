import { useState, useEffect } from 'react';
import { loginRequest } from './azure';
import { useMsal } from '@azure/msal-react';
import { useHistory } from 'react-router-dom';

export const useEndpoint = (
  url: string,
  opts?: RequestInit | undefined,
): Response | null => {
  const [data, setData] = useState<Response | null>(null);
  const { instance, accounts } = useMsal();
  const history = useHistory();

  useEffect(() => {
    instance
      .acquireTokenSilent({
        ...loginRequest,
        account: accounts[0],
      })
      .then((res_tok) => {
        opts = opts ?? {};

        opts = {
          ...opts,
          //credentials: 'include',
          headers: {
            ...opts.headers,
            Authorization: `Bearer ${res_tok.accessToken}`,
          },
        };

        fetch(url, opts).then((res) => setData(res));
      })
      .catch(() => history.push('/'));
  }, []);

  return data;
};
