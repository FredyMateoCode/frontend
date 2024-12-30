// Importar librerías necesarias
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

// Registrar los componentes necesarios de Chart.js
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const ProveedoresBarChart = () => {
  // Datos de ejemplo de proveedores registrados de julio a diciembre
  const data = {
    labels: ['Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'], // Meses
    datasets: [
      {
        label: 'Proveedores Registrados',
        data: [10, 15, 7, 20, 25, 18], // Ejemplo de números de proveedores por mes
        backgroundColor: '#36A2EB', // Color de las barras
        borderColor: '#1d72b8', // Color del borde de las barras
        borderWidth: 1, // Ancho del borde
      },
    ],
  };

  // Configuración opcional del gráfico
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            return `${context.label}: ${context.raw} proveedores`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true, // Asegura que el eje Y comience desde 0
      },
    },
  };

  return (
    <div>
      <h2>Proveedores Registrados (Julio - Diciembre)</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default ProveedoresBarChart;
