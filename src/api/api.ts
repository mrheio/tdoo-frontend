import ky from 'ky';
import { Env } from '../utils/utils';

const api = ky.extend({
	prefixUrl: Env.API_URL,
	credentials: 'include',
	hooks: {
		afterResponse: [
			async (req, options, res) => {
				if (res.status === 401) {
					const error = await res.json();

					if (error.details === 'The token has expired') {
						await api.post(`auth/refresh`, options).json();

						return api(req);
					}
				}
			},
		],
	},
});

export default api;
