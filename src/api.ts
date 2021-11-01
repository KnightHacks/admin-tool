import { useState, useEffect } from 'react';
import { loginRequest } from './azure';
import { useMsal } from '@azure/msal-react';
import { useHistory } from 'react-router-dom';

// TODO: fix the return type for this hook
export const useEndpoint = (
  url: string,
  opts?: RequestInit | undefined,
  /* eslint-disable-next-line */
): any | null => {
  const [data, setData] = useState(null);
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
          credentials: 'include',
          headers: {
            ...opts.headers,
            Authorization: `Bearer ${res_tok.accessToken}`,
          },
        };

        fetch(url, opts)
          .then((res) => res.json())
          .then((data) => setData(data));
      })
      .catch(() => history.push('/'));
  }, []);

  return data;
};
