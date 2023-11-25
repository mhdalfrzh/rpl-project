import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { listProducts } from '../actions/productActions';

export default function Category() {
    const { name = 'all', category = 'all'} = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(
            listProducts({ 
                name: name !== 'all' ? name : '',
                category: category !== 'all' ? category : '',
            })
        );
    }, [category, dispatch, name]);
    return(
        <div className="row center">
            <Link to={`/search/category/Buku%20dan%20Alat%20Tulis/name/${name}`}>
                <div className="card-category card-body">
                    Buku dan Alat Tulis
                </div>
            </Link>
            <Link to={`/search/category/Komputer%20dan%20Aksesoris/name/${name}`}>
                <div className="card-category card-body">
                    Komputer dan Aksesoris
                </div>
            </Link>
            <Link to={`/search/category/Baju%20dan%20Celana/name/${name}`}>
                <div className="card-category card-body">
                    Baju dan Celana
                </div>
            </Link>
            <Link to={`/search/category/Sepatu%20dan%20Sendal/name/${name}`}>
                <div className="card-category card-body">
                    Sepatu dan Sendal
                </div>
            </Link>
            <Link to={`/search/category/Kebutuhan%20Kampus/name/${name}`}>
                <div className="card-category card-body">
                    Kebutuhan Kampus
                </div>
            </Link>
            <Link to={`/search/category/Olahraga/name/${name}`}>
                <div className="card-category card-body">
                    Olahraga
                </div>
            </Link>
            <Link to={`/search/category/Tas/name/${name}`}>
                <div className="card-category card-body">
                    Tas
                </div>
            </Link>
            <div className="card-category card-body">
                <div className="dropdown-category">
                    <Link>
                        Lainnya
                    </Link>
                    <ul className="dropdown-content-category">
                        <li>
                            <Link to={`/search/category/Elektronik/name/${name}`}>
                                Elektronik
                            </Link>
                        </li>
                        <li>
                            <Link to={`/search/category/Handphone%20dan%20Aksesoris/name/${name}`}>
                                Handphone dan Aksesoris
                            </Link>
                        </li>
                        <li>
                            <Link to={`/search/category/Jam%20Tangan/name/${name}`}>
                                Jam Tangan
                            </Link>
                        </li>
                        <li>
                            <Link to={`/search/category/Kesehatan/name/${name}`}>
                                Kesehatan
                            </Link>
                        </li>
                        <li>
                            <Link to={`/search/category/Perlengkapan%20Rumah/name/${name}`}>
                                Perlengkapan Rumah
                            </Link>
                        </li>
                        <li>
                            <Link to={`/search/category/Otomotif/name/${name}`}>
                                Otomotif
                            </Link>
                        </li>
                        <li>
                            <Link to={`/search/category/Souvenir%20dan%20Pesta/name/${name}`}>
                                Souvenir dan Pesta
                            </Link>
                        </li>
                        <li>
                            <Link to={`/search/category/Kebutuhan%20Kos/name/${name}`}>
                                Kebutuhan Kos
                            </Link>
                        </li>
                        <li>
                            <Link to={`/search/category/Alat-Alat%20Musik/name/${name}`}>
                                Alat-Alat Musik
                            </Link>
                        </li>
                        <li>
                            <Link to={`/search/category/Lainnya/name/${name}`}>
                                Lainnya
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}