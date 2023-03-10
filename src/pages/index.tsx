import { GetStaticProps } from "next";
import { MovieCard } from "../components/MovieCard";
import { HomeContainer, MoviesContainer, SkeletonContainer } from "../styles/pages/home";
import Head from "next/head";
import { IMovie } from "../context/ContextAplicattion";
import { ProductSkeleton } from "../components/MovieSkeleton";

interface MovieProps {
  movies: IMovie[];
}

export default function Home({ movies }: MovieProps) {

  return (
    <>
    <Head>
      <title>Next+</title>
    </Head>
    <HomeContainer>
                <h1>Melhores Filmes</h1>
                <MoviesContainer>
                  {movies.map(movie => (
                    <MovieCard key={movie.id} movie={movie} />
                  ))}
                </MoviesContainer>
    </HomeContainer>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch(`${process.env.BASE_URL}top_rated?${process.env.API_KEY}`);
  const data = await response.json();
  const movies = data.results.map((movie) => {
     return {
      id: movie.id,
      title: movie.title,
      votes: movie.vote_average,
      imageUrl: movie.poster_path,
     }
    });
  return {
    props: {
      movies
    },
    revalidate: 60 * 60 * 1
  }
}