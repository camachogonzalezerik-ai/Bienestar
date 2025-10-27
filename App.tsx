
import React, { useState, useCallback } from 'react';
import { extractKeywords, generateImages } from './services/geminiService';
import Header from './components/Header';
import CollageGrid from './components/CollageGrid';
import LoadingSpinner from './components/LoadingSpinner';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingStep, setLoadingStep] = useState<string>('');
  const [images, setImages] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const TEXTO_SALUD = `
    1. La Salud como Bienestar Integral
    La salud se concibe como un estado de bienestar físico, mental y social que va más allá de la mera ausencia de enfermedad (Definición Integral). Esta visión se integra en el Desarrollo Humano Integral (DHI), que considera a las personas capaces de movilizar su potencial hacia el autocuidado físico y emocional, la gestión del conocimiento y la construcción de relaciones sociales positivas. Esta perspectiva llama a la responsabilidad individual para tomar decisiones y acciones diarias que mejoren las condiciones de vida presentes y futuras.
    2. Los Determinantes de la Salud y su Impacto Ambiental y Social
    Los determinantes de la salud son las circunstancias en que las personas nacen, crecen, trabajan, viven y envejecen (factores personales, sociales, económicos y ambientales).
    Para el contexto de la GAM, son cruciales los que requieren acciones comunitarias o de grupos amplios:
    • Medio Ambiente: Abarca el entorno natural y social, incluyendo la contaminación del aire (inflamación de vías respiratorias, cáncer), el impacto del ruido (construcciones, transporte) en la salud mental y el manejo de desechos. También incluye los hábitos de higiene en espacios comunes y transporte público.
    • Estilos de Vida: Es la dimensión con mayor control personal, implicando decisiones diarias sobre actividad física (caminar), alimentación (beber agua simple), gestión de emociones (manejar el enojo) y la adquisición de hábitos saludables.
    • Servicios de Atención: Influencia del acceso diferenciado a la práctica de la medicina, hospitales, medicamentos y servicios sanitarios.
    • Biología Humana: Factores no modificables como la edad y la herencia genética (predisposición a la hipertensión).
    Punto Clave para el Docente: Reconocer estos determinantes es fundamental para que el docente (como agente de cambio social) promueva la identificación y modificación de aquellos que están a su alcance en la comunidad escolar.
    3. Factores Protectores y Prevención
    Se deben promover los Factores Protectores que ayudan a contrarrestar los efectos de determinantes o hábitos poco saludables, como: tener una visión positiva, estrategias para afrontar dificultades, realizar actividad física o ejercicio, dormir de 7 a 9 horas, manejar el estrés y las emociones, practicar higiene personal y construir relaciones afectivas respetuosas.
    Se distingue la Promoción de la Salud (proceso para tener control sobre la salud) de la Prevención (aplicación de medidas para evitar o atenuar la enfermedad). Se destaca que los mejores resultados se obtienen mediante la acción colectiva.
    Resumen central para la GAM: Las ideas más relevantes se centran en la responsabilidad personal para tomar decisiones sobre los estilos de vida en un entorno donde los determinantes ambientales (contaminación, ruido, etc.) son críticos, y la necesidad de impulsar el bienestar integral a través de la acción colectiva en la escuela y la comunidad.
  `;

  const handleCreateCollage = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setImages([]);

    try {
      setLoadingStep('Analizando conceptos clave...');
      const keywords = await extractKeywords(TEXTO_SALUD);
      
      setLoadingStep('Generando imágenes inspiradoras...');
      const generatedImages = await generateImages(keywords);
      
      setImages(generatedImages);
    } catch (err) {
      console.error(err);
      setError('Ocurrió un error al crear el collage. Por favor, inténtalo de nuevo.');
    } finally {
      setIsLoading(false);
      setLoadingStep('');
    }
  }, [TEXTO_SALUD]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col items-center">
        <div className="w-full max-w-4xl text-center">
          <p className="mt-4 text-lg text-gray-600">
            Esta herramienta utiliza IA para transformar el concepto de salud y bienestar en un collage visual. Presiona el botón para comenzar.
          </p>
          
          <div className="mt-8 mb-8">
            <button
              onClick={handleCreateCollage}
              disabled={isLoading}
              className="px-8 py-4 bg-teal-600 text-white font-bold rounded-lg shadow-lg hover:bg-teal-700 focus:outline-none focus:ring-4 focus:ring-teal-500 focus:ring-opacity-50 transition-all duration-300 ease-in-out disabled:bg-gray-400 disabled:cursor-not-allowed transform hover:scale-105"
            >
              {isLoading ? 'Creando...' : 'Crear Collage de Bienestar'}
            </button>
          </div>

          {isLoading && <LoadingSpinner step={loadingStep} />}

          {error && (
            <div className="mt-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              <p>{error}</p>
            </div>
          )}

          {!isLoading && images.length > 0 && <CollageGrid images={images} />}
          
          {!isLoading && images.length === 0 && !error && (
            <div className="mt-12 p-8 border-2 border-dashed border-gray-300 rounded-lg bg-white">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">Tu collage aparecerá aquí</h3>
              <p className="mt-1 text-sm text-gray-500">
                Inicia el proceso para visualizar las ideas sobre bienestar.
              </p>
            </div>
          )}

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
