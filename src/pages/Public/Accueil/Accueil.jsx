import React, { useState } from 'react';
import CardCocktail from '@/components/public/CardCocktail/CardCocktail';
import useCocktail from '@/hooks/useCocktail';
import Title from '@/components/shared/Title/Title';
import Search from '@/components/shared/Search/Search';
import './accueil.css';


const Accueil = () => {
    const { cocktails } = useCocktail(null);

    //For pagination & cocktail
    const [currentPage, setCurrentPage] = useState(1);
    const cocktailsPerPage = 9;
    const pagesToShow = 5;

    //For Search functionality
    const [searchTerm, setSearchTerm] = useState('');

    const filteredCocktails = cocktails.filter(cocktail =>
        cocktail.strDrink.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Function to divide cocktail into 3 group of cocktail
    const chunkArray = (arr, chunkSize) => {
        const result = [];
        for (let i = 0; i < arr.length; i += chunkSize) {
            result.push(arr.slice(i, i + chunkSize));
        }
        return result;
    };

    // Index for pagination
    const indexOfLastCocktail = currentPage * cocktailsPerPage;
    const indexOfFirstCocktail = indexOfLastCocktail - cocktailsPerPage;
    const currentCocktails = filteredCocktails.slice(indexOfFirstCocktail, indexOfLastCocktail);

    const chunkedCocktails = chunkArray(currentCocktails, 3);

    // Function to change page 
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Generate number for pagination
    const totalPageCount = Math.ceil(filteredCocktails.length / cocktailsPerPage);
    const pages = Array.from({ length: totalPageCount }, (_, index) => index + 1);

    // Find index to display page 
    const startIndex = Math.max(0, currentPage - Math.floor(pagesToShow / 2));
    const endIndex = Math.min(totalPageCount - 1, startIndex + pagesToShow - 1);

    const displayedPageNumbers = pages.slice(startIndex, endIndex + 1);

    return (
        <div>
            <Title content={'Cocktails'} color={'#FFDF2B'} />
            <Search placeholder="Rechercher un cocktail..." value={searchTerm} onChange={(e) => 
                {
                    setSearchTerm(e.target.value)
                    setCurrentPage(1);
                }} />
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div>
                    <table>
                        {chunkedCocktails.map((row, rowIndex) => (
                            <tbody>
                                <tr key={rowIndex}>
                                    {row.map((col, colIndex) => (
                                        <td key={colIndex}>
                                            <CardCocktail
                                                title={col.strDrink}
                                                text="Texte de la carte"
                                                alcoholic={col.strAlcoholic}
                                                img={col.strDrinkThumb}
                                            />
                                        </td>
                                    ))}
                                </tr>
                            </tbody>
                        ))}
                    </table>
                    <div>
                        {displayedPageNumbers.map((pageNumber) => (
                            <button key={pageNumber} className={`pagination-number ${currentPage === pageNumber ? 'pagination-active' : ''}`}
                                onClick={() => {paginate(pageNumber)}}>
                                {pageNumber}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Accueil;