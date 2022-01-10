import { IconButton } from "@chakra-ui/button";
import { Box, Button, Input } from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/color-mode";
import { Flex, VStack, Heading, Spacer } from "@chakra-ui/layout";
import { FaSun, FaMoon } from "react-icons/fa";
import React, { useState, useEffect} from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

function App() {
  const [data, setdata] = useState(null)
  const [display, setdisplay] = useState(false)
  const [urllist, seturllist] = useState(false)
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";
//  const items = ["www.amazon.com", "www.daraz.com", "www.google.com", "www.fb.com", "www.youtube.com", "wwww.alibaba.com", "www.binanace.com", "www.skipq.org", "www.namal.edu.pk", "www.fiver.com", "www.upwork.com", "wwww.gmail.com", "www.tv.com", "www.education.com"];
const [posts, setPosts]= useState([]); 

useEffect(() => {
  const fetchPosts= async() => {
    const res=await axios({method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    url:"http://hwmcjcc01f.execute-api.us-east-2.amazonaws.com/prod/"});
    setPosts(res.data);
  }
  fetchPosts();
},[]);


const items = posts
console.log(items)
function Items({ currentItems }) {
    return (
      <>
        {currentItems &&
         currentItems.map((item) => (
          <Box w='100%'>
          <Heading  color='white' ml="2" size="md" >
          {item}
          </Heading>
          </Box>
         ))}
        </>
      );
    }
    function PaginatedItems({ itemsPerPage }) 
    {
      const [currentItems, setCurrentItems] = useState(null);
      const [pageCount, setPageCount] = useState(0);
      const [itemOffset, setItemOffset] = useState(0);
    
      useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        console.log(`Loading items from ${itemOffset} to ${endOffset}`);
        setCurrentItems(items.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(items.length / itemsPerPage));
      }, [itemOffset, itemsPerPage]);
      const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % items.length;
        console.log(
          `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
      };
    
      return (
        <VStack>
        <Flex>
        <Box bg='black' w='100%'>
          <Items currentItems={currentItems} />
          </Box>
        </Flex>
        <div > 
          <ReactPaginate
            breakLabel="..." nextLabel="Next>" 
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="<Back"
            renderOnZeroPageCount={null}
          />
        </div>
        </VStack>
      );
    }
  function getdata(event) 
  {
    var result="";
    
    if (event.target.value==="")
    {
        result="Please enter URL to search" ;
    }
    else
    {
      for (const element of items)
      {
       if (event.target.value ===element)
       {
         result="URL exist in table";
         break;
       }
       else
       {
         result="URL not exist in table";
       }
      }
    }
    setdata(result)
    setdisplay(false)
    seturllist(false)
  }
  return (
    <VStack>

      <Flex w="100%">
        <Heading ml="2" size="md" fontWeight='extrabold'
          color='blue.500' >M Irfan</Heading>
        <Spacer></Spacer>
        <IconButton ml={9} icon={isDark ? <FaSun /> : <FaMoon />}
          isRound="true" onClick={toggleColorMode}></IconButton>
      </Flex>


      <Flex w="30%">
        <Box bg='yellow' w='100%' p={4}>
          <Heading ml="2" size="md" fontWeight='extrabold'
            color='black' >CRUD API Gateway User Interface</Heading>
        </Box>
      </Flex>

      <Flex w="30%">
        <Input type='text' variant='filled' placeholder='Enter URL' onChange={getdata} />
      </Flex>

      <Flex w='10%'>
        <Button colorScheme='teal' size='lg' onClick={() => setdisplay(true)}>
          Search URL
        </Button>
      </Flex >

      <Flex w="100%">
        {
          display ?
            <Box bg='black' w='100%' p={4}><Heading ml="2" size="md"  color='white ' >{data}</Heading></Box>
            : null
        }

      </Flex>
      <Flex w='8%'>
        <Button colorScheme='teal' size='lg' onClick={()=>seturllist(true)}>
          Get URL 
        </Button>
      </Flex >

      <Flex w="100%">
        {
           urllist?
          <Box w="100%">           
            <PaginatedItems itemsPerPage={5} />
            </Box>
            : null
        }
      </Flex>
      
      

    </VStack>
  );
}
export default App;
