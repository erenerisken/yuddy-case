import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import {
  findCategoryInPath,
  flattenCategoryPath,
  getCategoryPathFromArray,
} from '../../utils/Category';
import { useRecoilValue } from 'recoil';
import { categoriesAtom } from '../../atoms/Category';
import { isEmpty, parseInt } from 'lodash';
import {
  Box,
  Breadcrumbs,
  Button,
  Divider,
  Grid,
  IconButton,
  Link,
  Paper,
  Typography,
} from '@mui/material';
import { sharedColors, sharedStyles } from '../../utils/Style';
import React, { useEffect, useState } from 'react';
import { getDefaultProductFilters } from '../../utils/ProductFilter';
import { PaginatedProducts } from '../../interfaces/Product';
import { getCategoryProducts } from '../../services/Product';
import { toast } from 'material-react-toastify';
import Waiting from '../Waiting';
import SortCriteriaSelect from '../SortCriteriaSelect';
import ProductCard from '../Product/ProductCard';
import ChevronLeftOutlinedIcon from '@mui/icons-material/ChevronLeftOutlined';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import ProductFilterPanel from './ProductFilterPanel';
import useIsMobile from '../../hooks/IsMobile';

const CategoryPage = () => {
  const navigate = useNavigate();

  const isMobile = useIsMobile();

  const { t } = useTranslation();

  const categories = useRecoilValue(categoriesAtom);

  const [productFilters, setProductFilters] = useState(
    getDefaultProductFilters(),
  );
  const [products, setProducts] = useState<PaginatedProducts>({
    products: [],
    brands: [],
    totalCount: 0,
  });
  const [loading, setLoading] = useState(false);

  const { categoryID } = useParams<string>();
  const categoryIDAsNumber = parseInt(categoryID ?? '');

  const categoryPath = getCategoryPathFromArray(categories, categoryIDAsNumber);

  useEffect(() => {
    if (!isEmpty(categories) && !categoryPath) {
      navigate('/');
    }
  }, [navigate, categories, categoryPath]);

  useEffect(() => {
    setLoading(true);
    getCategoryProducts(categoryIDAsNumber, productFilters)
      .then((fetchedProducts) => setProducts(fetchedProducts))
      .catch((err) => toast.error(err.message))
      .finally(() => setLoading(false));
  }, [categoryIDAsNumber, productFilters]);

  useEffect(() => {
    setProductFilters(getDefaultProductFilters());
  }, [categoryID]);

  const handlePagination = (next: boolean) => {
    setProductFilters({
      ...productFilters,
      pagination: {
        ...productFilters.pagination,
        pageNumber: next
          ? productFilters.pagination.pageNumber + 1
          : productFilters.pagination.pageNumber - 1,
      },
    });
  };

  const categoriesList = categoryPath
    ? flattenCategoryPath(categoryPath, categoryIDAsNumber)
    : [];

  const currentCategory = categoryPath
    ? findCategoryInPath(categoryPath, categoryIDAsNumber)
    : null;

  return (
    <Box
      component='div'
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        alignItems: 'center',
        pb: 5,
      }}
    >
      <Waiting open={loading} />
      <Box component='div' sx={{ ...sharedStyles.horizontalSpan }}>
        <Box
          component='div'
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            mt: 2.5,
          }}
        >
          {!isMobile && (
            <Breadcrumbs sx={{ mb: 2 }}>
              <Link
                underline='hover'
                color='inherit'
                href='/'
                sx={sharedStyles.breadcrumbs}
              >
                {t('breadcrumbs.home')}
              </Link>
              {categoriesList.map((category) => (
                <Link
                  underline='hover'
                  color='inherit'
                  href={`/category/${category.id}`}
                  sx={sharedStyles.breadcrumbs}
                >
                  {category.name}
                </Link>
              ))}
            </Breadcrumbs>
          )}
          {currentCategory && (
            <Grid container spacing={3.5} sx={{ maxWidth: '93vw' }}>
              {!isMobile && (
                <Grid item xs={3}>
                  <Paper
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      flexGrow: 1,
                      mb: 2.5,
                    }}
                  >
                    <Typography
                      sx={{
                        m: 2,
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        fontSize: '14px',
                      }}
                    >
                      {currentCategory.name}
                    </Typography>
                    {!isEmpty(currentCategory.subcategories) && <Divider />}
                    {currentCategory.subcategories.map((category) => (
                      <Button
                        onClick={() => navigate(`/category/${category.id}`)}
                        sx={{
                          textTransform: 'none',
                          justifyContent: 'left',
                          alignItems: 'left',
                          pl: 2,
                          color: sharedColors.black,
                          '&:hover': {
                            color: sharedColors.orange1,
                          },
                        }}
                      >
                        {category.name}
                      </Button>
                    ))}
                  </Paper>
                  <ProductFilterPanel
                    brands={products.brands}
                    filters={productFilters}
                    onChange={setProductFilters}
                  />
                </Grid>
              )}
              <Grid item xs={12} md={9}>
                <Box
                  sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}
                >
                  {isMobile ? (
                    <Box component='div'>
                      <Typography
                        sx={{
                          textTransform: 'uppercase',
                          fontSize: '1.375rem',
                          fontWeight: 600,
                          flexGrow: 1,
                          textAlign: 'center',
                        }}
                      >
                        {currentCategory.name}
                      </Typography>
                      <Box
                        component='div'
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          flexGrow: 1,
                          p: 2,
                          border: '1px solid #e1e1e1',
                          backgroundColor: sharedColors.gray7,
                          mt: 1.5,
                        }}
                      >
                        <Box
                          component='div'
                          sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            flexGrow: 1,
                          }}
                        >
                          <Box component='div' sx={{ flexGrow: 5, mr: 1.5 }}>
                            <SortCriteriaSelect
                              value={productFilters.sortCriteria}
                              onChange={(newCriteria) =>
                                setProductFilters({
                                  ...productFilters,
                                  sortCriteria: newCriteria,
                                })
                              }
                            />
                          </Box>
                          <Button
                            variant='outlined'
                            sx={{
                              flexGrow: 1,
                              borderRadius: 0,
                              color: sharedColors.black,
                              border: '1px solid #e1e1e1',
                            }}
                          >
                            {t('category.filter')}
                          </Button>
                        </Box>
                        <Typography
                          sx={{
                            flexGrow: 1,
                            textAlign: 'center',
                            fontSize: '14px',
                            fontWeight: 400,
                            color: sharedColors.gray8,
                            mt: 1.5,
                          }}
                        >
                          {t('category.showing_n_items', {
                            from:
                              (productFilters.pagination.pageNumber - 1) *
                                productFilters.pagination.pageSize +
                              1,
                            to: Math.min(
                              products.totalCount,
                              productFilters.pagination.pageNumber *
                                productFilters.pagination.pageSize,
                            ),
                            total: products.totalCount,
                          })}
                        </Typography>
                      </Box>
                    </Box>
                  ) : (
                    <Box component='div'>
                      <Box
                        component='img'
                        src={currentCategory.banner}
                        alt={currentCategory.name}
                        width='100%'
                        height='auto'
                      />
                      <Typography
                        sx={{
                          mt: 2.5,
                          textTransform: 'uppercase',
                          fontSize: '1.375rem',
                          fontWeight: 600,
                        }}
                      >
                        {currentCategory.name}
                      </Typography>
                      <Typography
                        sx={{ mt: 1.5, fontWeight: 400, fontSize: '14px' }}
                      >
                        {currentCategory.description}
                      </Typography>
                      <Paper
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          flexGrow: 1,
                          p: 2.5,
                          backgroundColor: sharedColors.gray7,
                          mt: 2.5,
                          alignItems: 'center',
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: '14px',
                            fontWeight: 400,
                            color: sharedColors.gray8,
                          }}
                        >
                          {t('category.n_products', { n: products.totalCount })}
                        </Typography>
                        <Box component='div' sx={{ flexGrow: 1 }} />
                        <Typography
                          sx={{
                            fontSize: '14px',
                            fontWeight: 400,
                            color: sharedColors.gray8,
                            mr: 1.5,
                          }}
                        >
                          {t('category.sort_by')}
                        </Typography>
                        <Box component='div' sx={{ width: 240 }}>
                          <SortCriteriaSelect
                            value={productFilters.sortCriteria}
                            onChange={(newCriteria) =>
                              setProductFilters({
                                ...productFilters,
                                sortCriteria: newCriteria,
                              })
                            }
                          />
                        </Box>
                      </Paper>
                    </Box>
                  )}
                  <Grid container spacing={3.5} sx={{ mt: 0.5, mb: 3.5 }}>
                    {products.products.map((product) => (
                      <Grid item xs={6} sm={6} md={4}>
                        <ProductCard product={product} />
                      </Grid>
                    ))}
                  </Grid>
                  <Box
                    component='div'
                    sx={{
                      display: 'flex',
                      flexGrow: 1,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: '14px',
                        fontWeight: 400,
                        color: sharedColors.gray8,
                      }}
                    >
                      {t('category.showing_n_items', {
                        from:
                          (productFilters.pagination.pageNumber - 1) *
                            productFilters.pagination.pageSize +
                          1,
                        to: Math.min(
                          products.totalCount,
                          productFilters.pagination.pageNumber *
                            productFilters.pagination.pageSize,
                        ),
                        total: products.totalCount,
                      })}
                    </Typography>
                    <Box component='div' sx={{ flexGrow: 1 }} />
                    <IconButton
                      onClick={() => handlePagination(false)}
                      disabled={productFilters.pagination.pageNumber === 1}
                    >
                      <ChevronLeftOutlinedIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handlePagination(true)}
                      disabled={
                        productFilters.pagination.pageNumber *
                          productFilters.pagination.pageSize >=
                        products.totalCount
                      }
                    >
                      <ChevronRightOutlinedIcon />
                    </IconButton>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default CategoryPage;
