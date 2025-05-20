import React from 'react';
import { FaGithub, FaGoogle } from 'react-icons/fa';

const Footer = () => {
    return (
        <div>
            <footer className="bg-gray-900 text-white py-8">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div>
                            <h3 className="text-xl font-bold mb-4">About Chill Gamer</h3>
                            <p className="text-gray-400">Your ultimate destination for honest game reviews and gaming community.</p>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
                            <ul className="space-y-2">
                                <li><a href="/" className="text-gray-400 hover:text-white">Home</a></li>
                                <li><a href="/reviews" className="text-gray-400 hover:text-white">Reviews</a></li>
                                <li><a href="/about" className="text-gray-400 hover:text-white">About Us</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold mb-4">Connect With Us</h3>
                            <div className="flex space-x-4">
                                <a href="#" className="text-gray-400 hover:text-white"><FaGoogle /></a>
                                <a href="#" className="text-gray-400 hover:text-white"><FaGithub /></a>
                            </div>
                        </div>
                    </div>
                    <div className="mt-8 pt-8 border-t border-gray-800 text-center">
                        <p className="text-gray-400">&copy; 2024 Chill Gamer. All rights reserved.</p>
                    </div>
                </div>
            </footer>
            
        </div>
    );
};

export default Footer;