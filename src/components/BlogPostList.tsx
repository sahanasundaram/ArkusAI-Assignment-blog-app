import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { BlogPost } from '../types';
import { getPosts } from '../utils/LocalStorageUtils';
import {
  Box,
  Button,
  TextField,
  CircularProgress,
  Typography,
  Container,
  Link as MuiLink,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from '@mui/material';
import { DataGrid, GridColDef, GridPaginationModel } from '@mui/x-data-grid';
import './BlogPostList.css';

const PAGE_SIZE_OPTIONS = [5, 10, 20]; // Options for the number of rows per page
const DEFAULT_PAGE_SIZE = 10; // Default number of posts per page

const BlogPostList: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: DEFAULT_PAGE_SIZE,
  });
  const [rowCount, setRowCount] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(DEFAULT_PAGE_SIZE);
  const navigate = useNavigate();

  const fetchPosts = useCallback(() => {
    setLoading(true);
    const allPosts = getPosts();
    const filteredPosts = allPosts.filter(post =>
      post.title.toLowerCase().includes(searchTerm)
    );
    setRowCount(filteredPosts.length);
    const paginatedPosts = filteredPosts.slice(
      paginationModel.page * paginationModel.pageSize,
      (paginationModel.page + 1) * paginationModel.pageSize
    );
    setPosts(paginatedPosts);
    setLoading(false);
  }, [paginationModel, searchTerm]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase());
    setPaginationModel({ ...paginationModel, page: 0 });
  };

  const handlePaginationModelChange = (model: GridPaginationModel) => {
    setPaginationModel(model);
  };

  const handlePageSizeChange = (event: SelectChangeEvent<number>) => {
    const newPageSize = event.target.value as number;
    setPageSize(newPageSize);
    setPaginationModel({ page: 0, pageSize: newPageSize });
  };

  const handleRowClick = (params: any) => {
    navigate(`/edit/${params.row.id}`);
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'title',
      headerName: 'Title',
      width: 300,
      renderCell: (params) => (
        <MuiLink
          component="button"
          onClick={() => handleRowClick(params)}
          underline="none"
          color="primary"
        >
          {params.value}
        </MuiLink>
      ),
    },
    {
      field: 'content',
      headerName: 'Content',
      width: 500,
      renderCell: (params) => (
        <Typography noWrap>{params.value}</Typography>
      ),
    },
    {
      field: 'imgUrl',
      headerName: 'Image',
      width: 150,
      renderCell: (params) => (
        params.value ? <img src={params.value} alt="Post" style={{ width: '100%' }} /> : null
      ),
    },
    {
      field: 'createdAt',
      headerName: 'Created At',
      width: 180,
      renderCell: (params) => (
        <Typography>{new Date(params.value).toLocaleDateString()}</Typography>
      ),
    },
  ];

  return (
    <Box
      sx={{
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        color: '#fff',
      }}
    >
      <Container maxWidth="md">
        <Box
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            borderRadius: '8px',
            padding: '20px',
            boxShadow: 3,
            width: '120%',
            height: '120%',
            minHeight: '600px',
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Blog Post List
          </Typography>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '20px',
            }}
          >
            <TextField
              label="Search by title"
              variant="outlined"
              value={searchTerm}
              onChange={handleSearchChange}
              sx={{ flexGrow: 1, marginRight: '10px' }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate('/new')}
            >
              Create New Blog Post
            </Button>
          </Box>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '20px',
            }}
          >
            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel id="page-size-select-label">Rows per page</InputLabel>
              <Select
                labelId="page-size-select-label"
                value={pageSize}
                onChange={handlePageSizeChange}
                label="Rows per page"
              >
                {PAGE_SIZE_OPTIONS.map(size => (
                  <MenuItem key={size} value={size}>
                    {size}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {loading ? (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                padding: '20px',
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <div style={{ height: 600, width: '100%' }}>
              <DataGrid
                rows={posts}
                columns={columns}
                pagination
                paginationMode="server"
                rowCount={rowCount}
                paginationModel={paginationModel}
                onPaginationModelChange={handlePaginationModelChange}
                onRowClick={handleRowClick}
                sx={{
                  '.MuiDataGrid-cell': {
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  },
                  '.MuiDataGrid-columnHeaders': {
                    backgroundColor: '#f5f5f5',
                  },
                  '.MuiDataGrid-footerContainer': {
                    backgroundColor: '#f5f5f5',
                  },
                }}
              />
            </div>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default BlogPostList;
