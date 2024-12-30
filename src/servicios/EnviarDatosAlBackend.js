import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const EnviarDatosAlBackend = ({ datos, onActualizacionExitosa }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!datos) return;

        const enviarDatos = async () => {
            setLoading(true);
            try {
                const response = await axios.put('http://192.168.1.6:4000/clientes/actualizar', datos);
                console.log('Respuesta del backend:', response.data);
                if (response.status === 200) {
                    Swal.fire({
                        icon: 'success',
                        title: '¡Actualización Exitosa!',
                        text: response.data.mensaje,
                    });

                    // Notificar al componente principal que la actualización fue exitosa
                    onActualizacionExitosa();
                }
            } catch (err) {
                console.error('Error al enviar los datos al backend:', err);
                setError('Error al enviar los datos al backend....');
            } finally {
                setLoading(false);
            }
        };

        enviarDatos();
    }, [datos, onActualizacionExitosa]);

    return (
        <div>
            {loading && <p>Enviando datos...</p>}
            {error && <p>{error}</p>}
        </div>
    );
};

export default EnviarDatosAlBackend;
