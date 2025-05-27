
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useToast } from '../hooks/use-toast';
import Header from '../components/Header';
import { Button } from '../components/ui/button';
import { ArrowLeft, CreditCard, Truck, Shield } from 'lucide-react';

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { cartItems, clearCart, getTotalPrice } = useCart();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    phone: '',
    paymentMethod: 'card'
  });

  console.log('CheckoutPage - cartItems:', cartItems);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Validación básica
    if (!formData.email || !formData.firstName || !formData.lastName || !formData.address) {
      toast({
        title: "Campos requeridos",
        description: "Por favor completa todos los campos obligatorios",
        variant: "destructive",
      });
      setIsProcessing(false);
      return;
    }

    try {
      // Simular procesamiento de pago
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Limpiar carrito después del pago exitoso
      clearCart();
      
      toast({
        title: "¡Pago procesado exitosamente!",
        description: "Tu pedido ha sido confirmado. Recibirás un email de confirmación.",
      });

      // Redirigir a página de éxito
      navigate('/checkout-success');
    } catch (error) {
      toast({
        title: "Error en el pago",
        description: "Hubo un problema procesando tu pago. Inténtalo nuevamente.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const total = getTotalPrice();

  // Si el carrito está vacío, mostrar mensaje
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 font-montserrat">
        <Header cartItems={cartItems} onCartClick={() => {}} />
        
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <h1 className="font-playfair text-3xl font-bold text-gray-800 mb-4">
              Tu carrito está vacío
            </h1>
            <p className="text-gray-600 mb-6">
              Agrega algunos productos antes de proceder al pago
            </p>
            <Button
              onClick={() => navigate('/')}
              className="bg-mystic-beige hover:bg-mystic-gold text-gray-800 font-semibold"
            >
              Continuar Comprando
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-montserrat">
      <Header cartItems={cartItems} onCartClick={() => {}} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center text-mystic-gold hover:text-mystic-beige transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver a la tienda
          </button>
          
          <h1 className="font-playfair text-3xl font-bold text-gray-800 mb-2">
            Finalizar Compra
          </h1>
          <p className="text-gray-600">
            Completa tu información para procesar el pago
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Formulario de checkout */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Información de contacto */}
              <div>
                <h2 className="font-playfair text-xl font-semibold mb-4 flex items-center">
                  <CreditCard className="w-5 h-5 mr-2 text-mystic-gold" />
                  Información de contacto
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-mystic-gold"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-mystic-gold"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-mystic-gold"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Apellido *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-mystic-gold"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Dirección de envío */}
              <div>
                <h2 className="font-playfair text-xl font-semibold mb-4 flex items-center">
                  <Truck className="w-5 h-5 mr-2 text-mystic-gold" />
                  Dirección de envío
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Dirección *
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-mystic-gold"
                      required
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Ciudad *
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-mystic-gold"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Código Postal
                      </label>
                      <input
                        type="text"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-mystic-gold"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Método de pago */}
              <div>
                <h2 className="font-playfair text-xl font-semibold mb-4 flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-mystic-gold" />
                  Método de pago
                </h2>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="card"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === 'card'}
                      onChange={handleInputChange}
                      className="mr-3"
                    />
                    <label htmlFor="card" className="text-gray-700">
                      Tarjeta de crédito/débito
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="transfer"
                      name="paymentMethod"
                      value="transfer"
                      checked={formData.paymentMethod === 'transfer'}
                      onChange={handleInputChange}
                      className="mr-3"
                    />
                    <label htmlFor="transfer" className="text-gray-700">
                      Transferencia bancaria
                    </label>
                  </div>
                </div>
              </div>

              {/* Botón de pago */}
              <Button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-mystic-beige hover:bg-mystic-gold text-gray-800 font-semibold py-3 text-lg"
              >
                {isProcessing ? 'Procesando...' : `Pagar $${total.toFixed(2)}`}
              </Button>
            </form>
          </div>

          {/* Resumen del pedido */}
          <div className="bg-white rounded-lg shadow-md p-6 h-fit">
            <h2 className="font-playfair text-xl font-semibold mb-4">
              Resumen del pedido
            </h2>
            
            <div className="space-y-4 mb-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center space-x-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800">{item.name}</h3>
                    <p className="text-sm text-gray-600">
                      Cantidad: {item.quantity}
                    </p>
                    <p className="text-mystic-gold font-semibold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-semibold">${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Envío:</span>
                <span className="font-semibold">Gratis</span>
              </div>
              <div className="flex justify-between items-center text-lg font-bold border-t pt-2">
                <span>Total:</span>
                <span className="text-mystic-gold">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
