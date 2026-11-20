import type { ReactNode } from "react"

import { Stack } from "expo-router"
import { Fragment } from "react"
import { ScrollView, View } from "react-native"

import { IconPlus } from "@tabler/icons-react-native"

import { Icon } from "@/components/ui/icon"
import { Text } from "@/components/ui/text"
import { Button } from "@/components/ui/button"

function Section({ title, children }: { title: string, children: ReactNode }) {
  return (
    <View className="gap-4 rounded-xl border border-border bg-card p-5">
      <Text className="font-semibold">
        {title}
      </Text>
      {children}
    </View>
  )
}

export default function DesignSystemScreen() {
  return (
    <Fragment>
      <Stack.Screen options={{ title: "Design System" }} />
      <ScrollView
        className="flex-1 bg-background"
        contentContainerClassName="gap-6 p-5 pb-10"
        contentInsetAdjustmentBehavior="automatic"
      >
        <Section title="Primary">
          <Button variant="default">
            <Text>Button</Text>
          </Button>
        </Section>
        <Section title="Secondary">
          <Button variant="secondary">
            <Text>Button</Text>
          </Button>
        </Section>
        <Section title="Outline">
          <Button variant="outline">
            <Text>Button</Text>
          </Button>
        </Section>
        <Section title="Ghost">
          <Button variant="ghost">
            <Text>Button</Text>
          </Button>
        </Section>
        <Section title="Destructive">
          <Button variant="destructive">
            <Text>Button</Text>
          </Button>
        </Section>
        <Section title="Loading">
          <Button loading>
            <Text>Loading</Text>
          </Button>
          <Button variant="outline" loading>
            <Text>Loading</Text>
          </Button>
        </Section>
        <Section title="Icon">
          <Button size="icon" variant="secondary">
            <Icon as={IconPlus} />
          </Button>
        </Section>
      </ScrollView>
    </Fragment>
  )
}
