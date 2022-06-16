import React from 'react';
import { Box, Button, VStack } from 'native-base';
import { FontAwesome } from '@expo/vector-icons';

export default function EnterReceipt() {
	return (
		<Box>
			<VStack space={3} alignItems="center">
				<Button
					size="lg"
					padding={10}
					colorScheme="primary"
					rightIcon={<FontAwesome name="camera" size={24} color="white" />}
					onPress={() => console.log('go to camera mode')}
				>
					Camera Mode
				</Button>
				<Button
					size="lg"
					padding={10}
					colorScheme="secondary"
					rightIcon={
						<FontAwesome name="pencil-square-o" size={24} color="white" />
					}
					onPress={() => console.log('go to manual entry mode')}
				>
					Manual Entry
				</Button>
			</VStack>
		</Box>
	);
}
