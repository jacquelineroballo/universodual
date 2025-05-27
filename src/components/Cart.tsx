
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CartItem } from '../types/Product';
import { Button } from './ui/button';
import { X } from 'lucide-react';

interface CartProps {
  cartItems: CartItem[];
  isOpen: boolean;
  onClose: () => void;
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemoveItem: (id: number) => void;
}

const Cart: React.FC<CartProps> = ({ 
  cartItems, 
  isOpen, 
  onClose, 
  onUpdateQuantity, 
  onRemoveItem 
}) => {
  const navigate = useNavigate();
  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleCheckout = () => {
    console.log('Navegando al checkout con items:', cartItems);
    if (cartItems.length > 0) {
      onClose();
      navigate('/checkout');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div className="bg-white w-full max-w-md h-full overflow-y-auto shadow-xl">
        {/* Header del carrito */}
        <div className="bg-mystic-lavender p-4 flex items-center justify-between">
          <h2 className="font-playfair text-xl font-bold text-gray-800">
            Tu Carrito Mágico
          </h2>
          <Button
            onClick={onClose}
            className="bg-transparent hover:bg-mystic-rose p-2"
            size="sm"
          >
            <X className="w-5 h-5 text-gray-800" />
          </Button>
        </div>

        {/* Contenido del carrito */}
        <div className="p-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="font-montserrat text-gray-500 mb-4">
                Tu carrito está vacío
              </p>
              <p className="font-montserrat text-sm text-gray-400">
                Agrega algunos productos mágicos para comenzar
              </p>
            </div>
          ) : (
            <>
              {/* Items del carrito */}
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="border-b border-mystic-lavender/20 pb-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      
                      <div className="flex-1">
                        <h3 className="font-playfair font-semibold text-gray-800">
                          {item.name}
                        </h3>
                        <p className="font-montserrat text-mystic-gold font-bold">
                          ${item.price.toFixed(2)}
                        </p>
                        
                        <div className="flex items-center space-x-2 mt-2">
                          <Button
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            className="bg-mystic-cream hover:bg-mystic-lavender text-gray-800 w-8 h-8 p-0"
                            disabled={item.quantity <= 1}
                          >
                            -
                          </Button>
                          
                          <span className="font-montserrat font-medium w-8 text-center">
                            {item.quantity}
                          </span>
                          
                          <Button
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="bg-mystic-cream hover:bg-mystic-lavender text-gray-800 w-8 h-8 p-0"
                          >
                            +
                          </Button>
                          
                          <Button
                            onClick={() => onRemoveItem(item.id)}
                            className="bg-red-100 hover:bg-red-200 text-red-800 ml-2"
                            size="sm"
                          >
                            Eliminar
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total y checkout */}
              <div className="border-t border-mystic-lavender pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-playfair text-lg font-semibold text-gray-800">
                    Total:
                  </span>
                  <span className="font-montserrat text-xl font-bold text-mystic-gold">
                    ${total.toFixed(2)}
                  </span>
                </div>
                
                <Button 
                  onClick={handleCheckout}
                  disabled={cartItems.length === 0}
                  className="w-full bg-mystic-beige hover:bg-mystic-gold text-gray-800 font-montserrat font-semibold py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Proceder al Pago
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
