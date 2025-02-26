// mockData.js
export const mockHelicopters = [
    {
      id: 1,
      name: 'Helicopter A',
      image: 'https://images.pexels.com/photos/12308377/pexels-photo-12308377.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Perfect for scenic tours.',
      capacity: 4,
      price: '$500/hour',
    },
    {
      id: 2,
      name: 'Helicopter B',
      image: 'https://images.pexels.com/photos/87011/helicopter-army-military-war-87011.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Ideal for business trips.',
      capacity: 6,
      price: '$700/hour',
    },
    {
      id: 3,
      name: 'Helicopter C',
      image: 'https://images.pexels.com/photos/90287/pexels-photo-90287.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Great for group travel.',
      capacity: 8,
      price: '$900/hour',
    },
  ];
  
  export const mockSignUpResponse = {
    success: true,
    message: 'Sign Up Successful!',
  };
  
  export const mockLoginResponse = {
    access_token: 'mock-access-token',
    message: 'Login Successful!',
  };
  
  export const mockBookingResponse = {
    success: true,
    message: 'Booking Successful!',
  };