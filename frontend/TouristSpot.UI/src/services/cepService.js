import axios from 'axios';

const CepService = {
    consultar: async (cep) => {
        // Limpa o CEP tirando o traço, deixando apenas números
        const cepLimpo = cep.replace(/\D/g, '');
        if (cepLimpo.length !== 8) throw new Error("CEP deve conter 8 dígitos");

        const response = await axios.get(`https://viacep.com.br/ws/${cepLimpo}/json/`);
        return response.data;
    }
}
export default CepService;