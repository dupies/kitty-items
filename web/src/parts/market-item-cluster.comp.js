import {Suspense} from "react"
import {useMarketItem} from "../hooks/use-market-item.hook"
import {useAccountItem} from "../hooks/use-account-item.hook"
import {useCurrentUser} from "../hooks/use-current-user.hook"
import {IDLE} from "../global/constants"
import {
  Tr,
  Td,
  Button,
  Spinner,
  Flex,
  Center,
  Text,
  HStack,
} from "@chakra-ui/react"

import {ItemImage} from "./account-item-cluster.comp"

export function MarketItemCluster({item: saleItem, status}) {
  const [cu, loggedIn] = useCurrentUser()

  const BUSY = status !== IDLE
  return (
    <Tr>
      <Td maxW="50px">
        <Flex>
          <Text>#{saleItem.saleItemId}</Text>
        </Flex>
      </Td>
      <Td>({saleItem.saleItemType})</Td>
      <Td>
        <ItemImage type={saleItem.saleItemType} />
      </Td>
      <Td isNumeric>{saleItem.price || 10}</Td>
      {loggedIn && (
        <>
          {saleItem.saleItemCollection === cu.addr ? (
            <Td isNumeric maxW="20px">
              <Button
                colorScheme="orange"
                size="sm"
                disabled={BUSY}
                onClick={() => {
                  // TODO
                }}
              >
                <HStack>
                  {BUSY && <Spinner mr="2" size="xs" />}
                  <Text>Unlist</Text>
                </HStack>
              </Button>
            </Td>
          ) : (
            <Td isNumeric maxW="15px">
              <Button
                colorScheme="blue"
                size="sm"
                disabled={BUSY}
                onClick={() => {
                  // TODO
                }}
              >
                <HStack>
                  {BUSY && <Spinner mr="2" size="xs" />}
                  <Text>Buy</Text>
                </HStack>
              </Button>
            </Td>
          )}
        </>
      )}
    </Tr>
  )
}

export default function WrappedMarketItemCluster(props) {
  return (
    <Suspense
      fallback={
        <Tr>
          <Td maxW="50px">
            <Flex>
              <Text>#{props.id}</Text>
              <Center ml="4">
                <Spinner size="xs" />
              </Center>
            </Flex>
          </Td>
          <Td />
          <Td />
        </Tr>
      }
    >
      <MarketItemCluster {...props} />
    </Suspense>
  )
}