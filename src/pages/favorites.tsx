import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { FaStar } from "react-icons/fa";
import { FavoritesContainer, Liked, MovieContainer, MoviesContainer, SkeletonContainer } from "../styles/pages/favorites";
import Image from "next/image";
import Head from "next/head";
import { ContextAplicattion } from '../context/ContextAplicattion';
import { ProductSkeleton } from "../components/MovieSkeleton";

export default function Favorites(){
  // Receives from the context all favorite movies and displays, in addition it receives the function to remove from favorites
  const { likedItems, removeMovieFromFavorites } = useContext(ContextAplicattion);
  const link= 'https://image.tmdb.org/t/p/w500/';
  return(
    <>
    <Head>
      <title>Next+</title>
    </Head>
    <FavoritesContainer>
            <h1>Filmes Favoritos</h1>
            <MoviesContainer>
              {likedItems.map(movie => (
                <MovieContainer key={movie.id}>
                    <Image src={ link + movie.imageUrl} width={200} height={150} alt={movie.title} />
                    <Liked>
                      <div className="star">
                        <FaStar size={24} />
                        <span>{movie.votes}</span>
                      </div>
                        <button onClick={() => removeMovieFromFavorites(movie.id)}>
                          <AiFillHeart size={32} color="#d60000" />
                        </button>
                    </Liked>
                    <h1>{movie.title}</h1>
                    <Link href={`/movie/${movie.id}`} prefetch={false} passHref>
                      <strong>Detalhes</strong>
                    </Link>
              </MovieContainer>
              ))}
            </MoviesContainer>
    </FavoritesContainer>
    </>
  )
}
