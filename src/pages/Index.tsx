
import React, { useState } from 'react';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart';
import Header from '../components/Header';
import Hero from '../components/Hero';
import ProductList from '../components/ProductList';
import Cart from '../components/Cart';
import { useToast } from '../hooks/use-toast';

const Index: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { toast } = useToast();
  
  // Usar el hook personalizado para productos
  const { products, loading, error, refetch } = useProducts();
  
  // Usar el hook personalizado para el carrito
  const { 
    cartItems, 
    addToCart, 
    updateQuantity, 
    removeFromCart, 
    getTotalItems 
  } = useCart();

  const handleAddToCart = (product: any) => {
    addToCart(product);
    
    const existingItem = cartItems.find(item => item.id === product.id);
    
    if (existingItem) {
      toast({
        title: "Producto actualizado",
        description: `Se agregó otra unidad de ${product.name} al carrito`,
      });
    } else {
      toast({
        title: "¡Producto agregado!",
        description: `${product.name} se ha agregado a tu carrito mágico`,
      });
    }
  };

  const handleRemoveFromCart = (id: number) => {
    removeFromCart(id);
    toast({
      title: "Producto eliminado",
      description: "El producto ha sido eliminado de tu carrito",
      variant: "destructive",
    });
  };

  return (
    <div className="min-h-screen bg-white font-montserrat">
      <Header 
        cartItems={cartItems} 
        onCartClick={() => setIsCartOpen(true)} 
      />
      
      <Hero />
      
      <div id="productos">
        <ProductList 
          products={products}
          onAddToCart={handleAddToCart}
          loading={loading}
          error={error}
          onRetry={refetch}
        />
      </div>
      
      <Cart
        cartItems={cartItems}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={handleRemoveFromCart}
      />
      
      {/* Footer */}
      <footer className="bg-mystic-lavender py-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="font-playfair text-2xl font-bold text-gray-800 mb-4">
            Universo Dual
          </h3>
          <p className="font-montserrat text-gray-600 mb-6">
            Conectando tu alma con la magia del universo
          </p>
          <div className="flex justify-center space-x-6 text-sm text-gray-500">
            <span>© 2024 Universo Dual</span>
            <span>•</span>
            <span>Todos los derechos reservados</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
