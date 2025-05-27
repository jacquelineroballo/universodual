
import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Package, Mail } from 'lucide-react';
import { Button } from '../components/ui/button';

const CheckoutSuccessPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-mystic-cream to-white flex items-center justify-center font-montserrat">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-lg shadow-xl p-8 text-center">
          <div className="mb-6">
            <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
            <h1 className="font-playfair text-3xl font-bold text-gray-800 mb-2">
              ¡Compra Exitosa!
            </h1>
            <p className="text-gray-600">
              Tu pedido ha sido procesado correctamente
            </p>
          </div>

          <div className="bg-mystic-lavender/20 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-center space-x-4 text-sm text-gray-700">
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2 text-mystic-gold" />
                <span>Email enviado</span>
              </div>
              <div className="flex items-center">
                <Package className="w-4 h-4 mr-2 text-mystic-gold" />
                <span>En preparación</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-sm text-gray-600">
              Recibirás un email de confirmación con los detalles de tu pedido y el seguimiento del envío.
            </p>
            
            <div className="pt-4">
              <Link to="/">
                <Button className="w-full bg-mystic-beige hover:bg-mystic-gold text-gray-800 font-semibold">
                  Continuar Comprando
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            ¿Necesitas ayuda? Contáctanos en{' '}
            <a href="mailto:soporte@universodual.com" className="text-mystic-gold hover:underline">
              soporte@universodual.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccessPage;
