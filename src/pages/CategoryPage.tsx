
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart';
import Header from '../components/Header';
import ProductList from '../components/ProductList';
import { useToast } from '../hooks/use-toast';
import { ArrowLeft } from 'lucide-react';

const CategoryPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const { toast } = useToast();
  
  const { products, loading, error, refetch } = useProducts();
  const { 
    cartItems, 
    addToCart, 
    updateQuantity, 
    removeFromCart 
  } = useCart();

  // Filtrar productos por categoría
  const filteredProducts = products.filter(product => 
    product.category === category
  );

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

  const getCategoryTitle = (cat: string) => {
    const titles: { [key: string]: string } = {
      'velas': 'Velas Artesanales',
      'inciensos': 'Inciensos Sagrados',
      'cristales': 'Cristales Mágicos',
      'accesorios': 'Accesorios Místicos'
    };
    return titles[cat] || 'Productos';
  };

  return (
    <div className="min-h-screen bg-white font-montserrat">
      <Header 
        cartItems={cartItems} 
        onCartClick={() => {}} 
      />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center text-mystic-gold hover:text-mystic-beige transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al inicio
          </Link>
          
          <h1 className="font-playfair text-4xl font-bold text-gray-800 mb-4">
            {getCategoryTitle(category || '')}
          </h1>
          
          <p className="font-montserrat text-gray-600 max-w-2xl">
            Explora nuestra selección especial de {category} cuidadosamente elaborados para elevar tu energía espiritual.
          </p>
        </div>

        <ProductList 
          products={filteredProducts}
          onAddToCart={handleAddToCart}
          loading={loading}
          error={error}
          onRetry={refetch}
        />
      </div>
    </div>
  );
};

export default CategoryPage;
